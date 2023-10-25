"use strict";

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const result = await super.create(ctx);
    console.log('result ss', result);

    const { default: axios } = require("axios");
    const { xenditHeaders } = require('../helpers/header.js');
    console.log(xenditHeaders);

    const payload = {
      external_id: result.data.id.toString(),
      payer_email: "chevy@gmail.com",
      description: "Payment for product",
      amount: result.data.attributes.totalPrice,
    };

    const response = await axios({
      method: "POST",
      url: "https://api.xendit.co/v2/invoices",
      headers: xenditHeaders,
      data: JSON.stringify(payload),
    });
    console.log("response nn", response.data);
    return JSON.stringify(response.data);
  },
}));
