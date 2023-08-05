import { Request, Response, NextFunction } from 'express';
import Ajv, { ErrorObject, Schema } from 'ajv';
import AjvFormats from 'ajv-formats';


const ajv = new Ajv();
AjvFormats(ajv);

function validateRequestBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {

    try {
        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            const errors = ajv.errors as ErrorObject[];
            const errorMessages = errors.map((error) => error.message);
            return res.status(400).json({ errors: errorMessages });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({ errors: error });
    }
   
  };
}

export default validateRequestBody;
