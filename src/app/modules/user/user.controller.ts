import { Request, Response } from 'express';
import { UserServices } from './user.service';


const crateUsers = async (req: Request, res: Response) => {
  try {
    const user = req.body;
   
    const result = await UserServices.createUserIntoDB(user);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something is wrong',
      error: err,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUser(userId);
    res.status(200).json({
      success: true,
      message: 'User is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const deletedUserOne = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.deleteUser(userId);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async(req: Request, res: Response)=>{
  try{
    const {userId} = req.params;
    const userData = req.body; 
    
    const result = await UserServices.updateAnUser(userId, userData);  
   
    res.status(200).json({
      success: true,
      message: 'User is updated successfully',
      data: result
    })
  }catch(err){
    if (err) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        error: {
          code: 404,
          description: 'User not found'
        },
      });
    }
  }
}

const crateOder = async (req: Request, res: Response)=>{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  try{
    const usersId = parseInt(req.params.userId)
    const orderData = req.body;
    const result = await UserServices.orderDb(usersId, orderData);
    res.status(200).json({
      success: true,
      message: 'order dded done',
      data: result
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(err : any){
    res.status(500).json({
      success: false,
      message: 'error adding in order',
      error: {
        code: 404,
        description: err.message || 'internal error'
      }
    })
  }
}

const getusersOrder = async (req: Request, res: Response)=>{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  try{
    const usersId = req.params.usersId
    
    const result = await UserServices.gotOderDb(usersId );
    res.status(200).json({
      success: true,
      message: 'order dded done',
      data: result
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(err : any){
    res.status(500).json({
      success: false,
      message: 'error adding in order',
      error: {
        code: 404,
        description: err.message || 'internal error'
      }
    })
  }
}

const orderPriceCound = async (req: Request, res: Response)=>{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  try{
    const usersId = req.params.usersId
   
    const result = await UserServices.calculateTotalPriceDb(usersId );
    res.status(200).json({
      success: true,
      message: 'order dded done',
      data: result
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }catch(err : any){
    res.status(500).json({
      success: false,
      message: 'error adding in order',
      error: {
        code: 404,
        description: err.message || 'internal error'
      }
    })
  }
}


export const UsersControllers = {
  crateUsers,
  getAllUsers,
  getSingleUser,
  deletedUserOne,
updateUser,
crateOder,
getusersOrder,
orderPriceCound
};
