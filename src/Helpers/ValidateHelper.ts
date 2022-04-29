import { RESPONSE } from "../Constants/ResponseConstant";

export const validate = async (body, res, schema) => {
  try {
    console.log('validate');
    const validation = await schema.validate(body, { abortEarly: false });

    if (validation.error) {
      const error = validation.error.details.map(e => e = e.message);
       res.status(RESPONSE.HTTP_BAD_REQUEST).json({
        status: RESPONSE.HTTP_BAD_REQUEST,
        message: 'validation failed',
        error
      });

      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
  }
}