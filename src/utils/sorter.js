const likesComparerASC = (blogA, blogB) => {
  if (blogA.likes === blogB.likes) return 0;
  if (blogA.likes < blogB.likes) return -1;
  else return 1;
};

const likesComparerDESC = (blogA, blogB) => {
  if (blogA.likes === blogB.likes) return 0;
  if (blogA.likes > blogB.likes) return -1;
  else return 1;
};
export default { likesComparerASC, likesComparerDESC };
