import { Router } from "express";
const router = Router();
router.get("/list", (request, response) => {
  console.log(request.headers.cookie);
  console.log(request.cookies);
  console.log(request.signedCookies.hello);

  // if (request.cookies.hello && request.cookies.hello == "test cookies1")
  //   return response.status(200).send({
  //     status: true,
  //     data: {
  //       fruit: "Banana",
  //       price: 4000,
  //       quantity: 10,
  //     },
  //   });
  if (request.signedCookies.hello && request.signedCookies.hello == "test cookies")
    return response.status(200).send({
      status: true,
      data: {
        fruit: "Apple",
        price: 5000,
        quantity: 5,
      },
    });

  response.send({
    message: "You need to provide the correct cookies!",
  });
});
export default router;
