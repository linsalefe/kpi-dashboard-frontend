'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

interface KPIUpdate {
  sector: string;
  action: string;
  dataId?: number;
  dateRef?: string;
  kpis: {
    roi: number;
    cpl: number;
    taxa_conversao: number;
    ctr: number;
  };
  timestamp: string;
}

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<KPIUpdate | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Criar conexão Socket.io
    const socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    // Event: Conectado
    socket.on('connect', () => {
      console.log('🔌 Socket.io conectado:', socket.id);
      setIsConnected(true);
    });

    // Event: Desconectado
    socket.on('disconnect', (reason) => {
      console.log('🔌 Socket.io desconectado:', reason);
      setIsConnected(false);
    });

    // Event: Mensagem de boas-vindas
    socket.on('connected', (data) => {
      console.log('✅ Recebido do servidor:', data);
    });

    // Event: Atualização de KPI (global)
    socket.on('kpi:update', (data: KPIUpdate) => {
      console.log('📊 KPI atualizado:', data);
      setLastUpdate(data);
    });

    // Cleanup ao desmontar
    return () => {
      socket.disconnect();
    };
  }, []);

  // Função para se inscrever em um setor específico
  const subscribeSector = useCallback((sector: string) => {
    if (socketRef.current) {
      socketRef.current.emit('subscribe:sector', sector);
      console.log(`📍 Inscrito no setor: ${sector}`);
    }
  }, []);

  // Função para cancelar inscrição em um setor
  const unsubscribeSector = useCallback((sector: string) => {
    if (socketRef.current) {
      socketRef.current.emit('unsubscribe:sector', sector);
      console.log(`📍 Desinscrito do setor: ${sector}`);
    }
  }, []);

  // Função para escutar eventos customizados
  const on = useCallback((event: string, callback: (data: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback);
    }
  }, []);

  // Função para parar de escutar eventos
  const off = useCallback((event: string) => {
    if (socketRef.current) {
      socketRef.current.off(event);
    }
  }, []);

  return {
    isConnected,
    lastUpdate,
    subscribeSector,
    unsubscribeSector,
    on,
    off,
  };
}
