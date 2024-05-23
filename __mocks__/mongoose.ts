import mongoose from 'mongoose';

const mockConnect = jest.fn().mockResolvedValue({});
const mockModel = jest.fn().mockImplementation(() => {
  return {
    create: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
    save: jest.fn(),
  };
});

const mockSchema = jest.fn(() => {
  return {
    methods: {},
    statics: {},
  };
});

const mongooseMock = {
  ...mongoose,
  connect: mockConnect,
  model: mockModel,
  Schema: mockSchema,
  models: {},
};

module.exports = mongooseMock;
