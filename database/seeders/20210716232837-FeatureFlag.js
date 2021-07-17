'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		
		await queryInterface.bulkInsert('FeatureFlags', [
			{
				feature  : 'dashboard',
				icon     : 'fa fa-tachometer-alt',
				route    : '/dashboard',
				status   : 'coming soon',
				createdAt: new Date,
				updatedAt: new Date
			},
			{
				feature  : 'developments',
				icon     : 'fa fa-laptop-code',
				route    : '',
				status   : 'coming soon',
				createdAt: new Date,
				updatedAt: new Date
			},
			{
				feature  : 'commits',
				icon     : 'fab fa-connectdevelop',
				route    : 'commits',
				status   : 'coming soon',
				createdAt: new Date,
				updatedAt: new Date
			},
			{
				feature  : 'repositories',
				icon     : 'fa fa-folder',
				route    : 'repositories',
				status   : 'active',
				createdAt: new Date,
				updatedAt: new Date
			},
			{
				feature  : 'branches',
				icon     : 'fa fa-code-branch',
				route    : 'branches',
				status   : 'active',
				createdAt: new Date,
				updatedAt: new Date
			},
			{
				feature  : 'modules',
				icon     : 'fa fa-sitemap',
				route    : 'modules',
				status   : 'active',
				createdAt: new Date,
				updatedAt: new Date
			},
			{
				feature  : 'developers',
				icon     : 'fa fa-users',
				route    : '',
				status   : 'coming soon',
				createdAt: new Date,
				updatedAt: new Date
			}
		], {});
	},
	
	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('FeatureFlags', null, {});
	}
};
