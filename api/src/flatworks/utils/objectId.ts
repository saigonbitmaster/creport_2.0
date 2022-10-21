import { Types } from 'mongoose';

const ToObjectId = (objectId) => {
  return new Types.ObjectId(objectId);
};

export { ToObjectId };
