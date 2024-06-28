const mockProducer = {
    connect: jest.fn().mockResolvedValue(undefined),
    send: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
  };
  
  const mockConsumer = {
    connect: jest.fn().mockResolvedValue(undefined),
    subscribe: jest.fn().mockResolvedValue(undefined),
    run: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
  };
  
  export const Kafka = jest.fn().mockImplementation(() => ({
    producer: () => mockProducer,
    consumer: () => mockConsumer,
  }));
  
  export const producer = mockProducer;
  export const consumer = mockConsumer;