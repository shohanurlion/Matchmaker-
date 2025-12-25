import prisma from "../../../shared/prisma";

const creatBlog = async (req: any) => {
    const email = req.user.email;
    const adimin = await prisma.admin.findUniqueOrThrow({
        where: {
            email: email,
        },
    });
    const result = await prisma.blog.create({
        data: {
            ...req.body,
            adminId: adimin.id,
        },
        include: {
            admin: true,
        },
    });
    return result;
};

const updateBlog = async (blogId: string, data: any) => {
    const result = await prisma.blog.update({
        where: {
            id: blogId,
        },
        data: data,
    });
    return result;
};

const deleteBlog = async (blogId: string) => {
    const result = await prisma.blog.delete({
        where: {
            id: blogId,
        },
    });
    return result;
}

const getBlogsByAdmin = async (req: any) => {
    const email = req.user.email;
    const admin = await prisma.admin.findUniqueOrThrow({
        where: {
            email: email,
        },
    });
    const adminId = admin.id;
    const result = await prisma.blog.findMany({
        where: {
            adminId: adminId,
        },
    });
    return result;
}
const getallBlogs = async () => {
    const result = await prisma.blog.findMany({
        include: {
            admin: true,
        },
    });
    return result;
}
export const blogService = {
    creatBlog,
    updateBlog,
    deleteBlog,
    getBlogsByAdmin,
    getallBlogs
};