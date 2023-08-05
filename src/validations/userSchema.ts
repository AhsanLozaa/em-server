// export const userSchema = {
//     "type": "object",
//     "properties": {
//       "name": { "type": "string" },
//       "email": { "type": "string", "format": "email" },
//       "phoneNumber": { "type": "string" },
//       "profilePicture": { "type": "string" },
//       "addressId": { "type": "string" }
//     },
//     "required": ["name", "email", "phoneNumber"],
//     "additionalProperties": false
// }

export const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'string' },
  },
  required: ['name', 'email', 'password'],
  additionalProperties: true,
};

export const sellerSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    sellerRating: { type: 'number', minimum: 0, maximum: 5 },
    description: { type: 'string' },
  },
  required: ['description'],
  additionalProperties: true,
};

export const parentSchema = {
  type: 'object',
  properties: {
    user: userSchema,
    seller: sellerSchema,
  },
  required: ['user', 'seller'],
  additionalProperties: false,
};
