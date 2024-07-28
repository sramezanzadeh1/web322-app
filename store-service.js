const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

const sequelize = new Sequelize('postgresql://Shayan%27s%20Shop_owner:qCmoeIlXgA51@ep-red-credit-a5k0zzmx.us-east-2.aws.neon.tech/Shayan%27s%20Shop?sslmode=require');

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  postDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  featureImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  published: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
});

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: DataTypes.STRING, 
    allowNull: false
  }
});

Item.belongsTo(Category, { foreignKey: 'category' });

module.exports.initialize = function () {
  return new Promise((resolve, reject) => {
    sequelize.sync()
      .then(() => resolve())
      .catch((err) => reject("Unable to sync the database: " + err));
  });
};

module.exports.getAllItems = function () {
  return new Promise((resolve, reject) => {
    Item.findAll()
      .then((data) => resolve(data))
      .catch((err) => reject("No results returned: " + err));
  });
};

module.exports.getItemsByCategory = function (category) {
  return new Promise((resolve, reject) => {
    Item.findAll({
      where: { category: category }
    })
      .then((data) => resolve(data))
      .catch((err) => reject("No results returned: " + err));
  });
};

module.exports.getItemsByMinDate = function (minDateStr) {
  const { gte } = Sequelize.Op;
  return new Promise((resolve, reject) => {
    Item.findAll({
      where: {
        postDate: { 
          [gte]: new Date(minDateStr)
        }
      }
    })
      .then((data) => resolve(data))
      .catch((err) => reject("No results returned: " + err));
  });
};

module.exports.getItemById = function (id) {
  return new Promise((resolve, reject) => {
    Item.findAll({
      where: { id: id }
    })
      .then((data) => resolve(data[0]))
      .catch((err) => reject("No results returned: " + err));
  });
};

module.exports.addItem = function (itemData) {
  return new Promise((resolve, reject) => {
    itemData.published = (itemData.published) ? true : false;
    for (let prop in itemData) {
      if (itemData[prop] === "") {
        itemData[prop] = null;
      }
    }
    itemData.postDate = new Date(); 

    Item.create(itemData)
      .then(() => resolve())
      .catch((err) => reject("Unable to create item: " + err));
  });
};

module.exports.getPublishedItems = function () {
  return new Promise((resolve, reject) => {
    Item.findAll({
      where: { published: true }
    })
      .then((data) => resolve(data))
      .catch((err) => reject("No results returned: " + err));
  });
};

module.exports.getPublishedItemsByCategory = function (category) {
  return new Promise((resolve, reject) => {
    Item.findAll({
      where: {
        published: true,
        category: category
      }
    })
      .then((data) => resolve(data))
      .catch((err) => reject("No results returned: " + err));
  });
};

module.exports.getCategories = function () {
  return new Promise((resolve, reject) => {
    Category.findAll()
      .then((data) => resolve(data))
      .catch((err) => reject("No results returned: " + err));
  });
};

module.exports.addCategory = function (categoryData) {
  return new Promise((resolve, reject) => {
    for (let prop in categoryData) {
      if (categoryData[prop] === "") {
        categoryData[prop] = null;
      }
    }

    Category.create(categoryData)
      .then(() => resolve())
      .catch((err) => reject("Unable to create category: " + err));
  });
};

module.exports.deleteCategoryById = function (id) {
  return new Promise((resolve, reject) => {
    Category.destroy({
      where: { id: id }
    })
      .then(() => resolve())
      .catch((err) => reject("Unable to delete category: " + err));
  });
};

module.exports.deleteItemById = function (id) {
  return new Promise((resolve, reject) => {
    Item.destroy({
      where: { id: id }
    })
      .then(() => resolve())
      .catch((err) => reject("Unable to delete item: " + err));
  });
};
