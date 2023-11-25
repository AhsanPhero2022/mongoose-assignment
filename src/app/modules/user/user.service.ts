import { userModel  } from '../user.model';


const createUserIntoDB = async (userData: typeof userModel) => {
  const result = await userModel.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = userModel.find();
  return result;
};

const getSingleUser = async (userId: string) => {
  const result = userModel.findOne({ userId });
  return result;
};
const deleteUser = async (userId: string) => {
  const result = userModel.deleteOne({ userId });
  return result;
};

const updateAnUser = async (userId: string, updateUser: typeof userModel) => {
  const userExists = await userModel.findOne({ userId });

  if (!userExists) {
    throw new Error('User not available');
  }

  const result = await userModel.updateOne({ userId }, { $set: updateUser });
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const orderDb = async (userId: number, orderData: any) => {
  try {
    const user = await userModel.findOne({ userId });
    const userExists = await userModel.isUserExists(Number(userId));

    if (!userExists) {
      throw new Error('User not found');
    }
    if (user && !Array.isArray(user.order)) {
      user.order = [];
    }
    user?.order.push(orderData);
    await user?.save();
    return {
      success: true,
      message: 'order data added successful',
      data: null,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Internal error',
    };
  }
};

const gotOderDb = async (userId: string) => {
  const userExists = await userModel.isUserExists(Number(userId));

  if (!userExists) {
    throw new Error('user not found');
  }

  const user = await userModel.findOne({ userId }).select('-password');
  const newOrder = user?.order || [];
  return newOrder;
};

const calculateTotalPriceDb = async (userId: string) => {
  const userExists = await userModel.isUserExists(Number(userId));

  if (!userExists) {
    throw new Error('user not found');
  }

  const calculateResult = await userModel.aggregate([
    { $match: {userId: Number(userId) } },
    { $unwind: '$order' },
    {
      $group: {
        _id: '$userId',
        totalPrice: { $sum: '$order.price' },
        orders: { $push: '$order' },
      },
    },
  ]);

  if (calculateResult.length === 0) {
   
      return {
        success: false, 
        message: 'user not found',
        code: 404
    }
  }
  const { totalPrice ,  } = calculateResult[0];
  return { totalPrice };
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUser,
  deleteUser,
  updateAnUser,
  calculateTotalPriceDb,
  gotOderDb,
  orderDb
};
