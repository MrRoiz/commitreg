'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //  'dashboard','fa fa-tachometer-alt','/dashboard','coming soon'
    //  'developments','fa fa-laptop-code','','coming soon'
    //  'commits','fab fa-connectdevelop','commits','comming soon',
    //  'repositories','fa fa-folder','repositories','active'
    //  'branches','fa fa-code-branch','branches','active',
    //  'modules','fa fa-sitemap','modules','active'
    //  'developers','fa fa-users','','coming soon'
    await queryInterface.bulkInsert('FeatureFlags', [
      {
        feature: 'dashboard',
        icon: 'fa fa-tachometer-alt',
        route : '/dashboard',
        status : 'coming soon',
        createdAt : new Date,
        updatedAt : new Date
      },
      {
        feature: 'developments',
        icon: 'fa fa-laptop-code',
        route : '',
        status : 'coming soon',
        createdAt : new Date,
        updatedAt : new Date
      },
      {
        feature: 'commits',
        icon: 'fab fa-connectdevelop',
        route : 'commits',
        status : 'coming soon',
        createdAt : new Date,
        updatedAt : new Date
      },
      {
        feature: 'repositories',
        icon: 'fa fa-folder',
        route : 'repositories',
        status : 'active',
        createdAt : new Date,
        updatedAt : new Date
      },
      {
        feature: 'branches',
        icon: 'fa fa-code-branch',
        route : 'branches',
        status : 'active',
        createdAt : new Date,
        updatedAt : new Date
      },
      {
        feature: 'modules',
        icon: 'fa fa-sitemap',
        route : 'modules',
        status : 'active',
        createdAt : new Date,
        updatedAt : new Date
      },
      {
        feature: 'developers',
        icon: 'fa fa-users',
        route : '',
        status : 'coming soon',
        createdAt : new Date,
        updatedAt : new Date
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('FeatureFlags', null, {});
  }
};
