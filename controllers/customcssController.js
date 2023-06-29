

import CustomCssModel from '../models/CustomCssModel.js'
export const writecssController = async (req, res) => {

  try {
    const { cssplate } = req.body;
    console.log("l;;----------------------------------------------------------------", cssplate)
    const userCSS = new CustomCssModel({
      cssplate,
    });
    const data = await userCSS.save()

    res.status(200).send({
      success: true,
      message: "CSS stored 'in back-end' success",
      data,
    });

    console.log(res, "heloo as");
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Storing css 'in back-end'",
      error,
    });
  }
};
export const getCssController = async (req, res) => {
  try {
    const cssData = await CustomCssModel.findOne().sort({ createdAt: -1 });

    if (!cssData) {
      return res.status(404).send({
        success: false,
        message: "CSS not found",
      });
    }

    const cssplate = cssData.cssplate;

    res.status(200).send({
      success: true,
      message: "Latest CSS retrieved successfully",
      cssplate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in retrieving CSS",
      error,
    });
  }
};
