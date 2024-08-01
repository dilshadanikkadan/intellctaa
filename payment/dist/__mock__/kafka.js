"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumer = exports.producer = exports.Kafka = void 0;
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
exports.Kafka = jest.fn().mockImplementation(() => ({
    producer: () => mockProducer,
    consumer: () => mockConsumer,
}));
exports.producer = mockProducer;
exports.consumer = mockConsumer;
