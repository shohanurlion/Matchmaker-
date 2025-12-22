import prisma from "../../../shared/prisma";

const creatcategory = async (req: any) => {
    const result = await prisma.category.create({
        data: req.body
    });
    return result;
};

const getCatergories = async () => {
    const result = await prisma.category.findMany({});
    return result;
};
const getpostbycategory = async (categoryId: string) => {
   const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      posts: true,
    },
  });
    if (!category) {
    throw new Error('Category not found');
  }
    return category.posts;
}

export const categoryService = {
    creatcategory,
    getCatergories,
    getpostbycategory
};