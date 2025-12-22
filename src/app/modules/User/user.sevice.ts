import { UserRole, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import prisma from '../../../shared/prisma';


const createAdmin = async (req: any) => {
  const hassPasword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.admin.email,
    password: hassPasword,
    role: UserRole.ADMIN
  }
  const result = await prisma.$transaction (async (transactionClient)=>{
    const user = await transactionClient.user.create({
      data: userData
    });
    const creatAdmin = await transactionClient.admin.create({
      data: req.body.admin
    });
    return { ...user, creatAdmin };
  })
  return result;
};

const createMatchmaker = async (req: any) => {

  const hassPasword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.matchmaker.email,
    password: hassPasword, 
    role: UserRole.MATCHMAKER
  }
  const result = await prisma.$transaction (async (transactionClient)=>{
    const user = await transactionClient.user.create({
      data: userData
    });
    const createMatchmaker = await transactionClient.matchmaker.create({
      data: req.body.matchmaker
    });
    return { ...user, createMatchmaker };
  })
  return result;
}
const getallMatchmakers = async () => {
  const matchmakers = await prisma.matchmaker.findMany();
  return matchmakers;
}
const deleteMatchmaker = async (id: string) => {
  const deletedMatchmaker = await prisma.matchmaker.delete({
    where: {
      id: id
    }
  });
  return deletedMatchmaker;
}

const creatNormaluser = async (req: any) => {
  const hassPasword = await bcrypt.hash(req.body.password, 12);
  const userData = {
    email: req.body.normaluser.email,
    password: hassPasword, 
    role: UserRole.USER
  }
  const result = await prisma.$transaction (async (transactionClient)=>{
    const user = await transactionClient.user.create({
      data: userData
    });
    const creatNormaluser = await transactionClient.normaluser.create({
      data: req.body.normaluser
    });
    return { ...user, creatNormaluser };
  })
  return result;
}

const createMatchmakerpost = async (req: any) => {
  const userEmail = req.user.email;
  const matchmaker =  await prisma.matchmaker.findUnique({
    where: {
      email: userEmail
    }
  });
  if(!matchmaker){
    throw new Error('Matchmaker not found');
  }
  const matchmakerdata = req.body
  console.log(matchmakerdata);
  const result = await prisma.matchmakerpost.create({
    data: {
      ...matchmakerdata,
      matchmakerId: matchmaker.id
    }
  });
  return result;
}
const updateMatchmakerpost = async (req: any) => {
  const id = req.params.id;
  const matchmakerpost = await prisma.matchmakerpost.findUnique({
    where: {
      id: id
    }
  });
  if(!matchmakerpost){
    throw new Error('Matchmaker Post not found');
  }
  const result = await prisma.matchmakerpost.update({
    where: {
      id: id
    },
    data: req.body
  });
  return result;
}
const getallMatchmakerposts = async (req:any) => {
  const userEmail = req.user.email;
  console.log(userEmail);
  const matchmaker =  await prisma.matchmaker.findUnique({
    where: {
      email: userEmail,
    }
  });
  if(!matchmaker){
    throw new Error('Matchmaker not found');
  }
  const matchmakerposts = await prisma.matchmakerpost.findMany({
    where: {
      matchmakerId: matchmaker.id
    }
  });
  return matchmakerposts;
}
const deleteMatchmakerpost = async (id: string) => {
  const deletedMatchmakerpost = await prisma.matchmakerpost.delete({
    where: {
      id: id
    }
  });
  return deletedMatchmakerpost;
}
const changeprofilestatus = async (id: string, status: UserStatus) => {
  const userData = await prisma.user.findUniqueOrThrow({
        where: {
            id
        }
    });

    const updateUserStatus = await prisma.user.update({
        where: {
            id
        },
        data: status
    });

    return updateUserStatus;
}
const getMyprofile = async (req:any) => {
  
  const userEmail = req.user.email;
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
      status: UserStatus.ACTIVE
    }
  });
  if(!user){
    throw new Error('User not found');
  }
  let profile;
  if(user.role === UserRole.ADMIN){
    profile = await prisma.admin.findUnique({
      where: {
        email: userEmail
      }
    });
  }
  else if(user.role === UserRole.MATCHMAKER){
    profile = await prisma.matchmaker.findUnique({
      where: {
        email: userEmail
      }
    });
  }
  else if(user.role === UserRole.USER){
    profile = await prisma.normaluser.findUnique({
      where: {
        email: userEmail
      }
    });
  }
  return profile;

}

export const userService = {
  createAdmin,
  createMatchmaker,
  creatNormaluser,
  createMatchmakerpost,
  getallMatchmakers,
  getallMatchmakerposts,
  deleteMatchmaker,
  deleteMatchmakerpost,
  getMyprofile,
  changeprofilestatus,
  updateMatchmakerpost
};
