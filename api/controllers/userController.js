const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ user_id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.signup(name, email, password);

    // create a token
    const token = createToken(user._id);

    const userWithId = await User.findOne({ email: email });

    // if 'email' is changed to 'user_id: user._id', email is still passed in the response, not user_id
    res.status(200).json({ user_id: userWithId._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const emergencyContact = async (req, res) => {
  const { user_id, emergencyContactEmail, field } = req.body;
  const reqContact = await User.findOne({ email: emergencyContactEmail });
  console.log("hello");
  console.log(reqContact);
  if (!reqContact) {
    res.status(400).json({ error: "This user does not exist" });
    return;
  } else {
    if (field === "add") {
      const user = await User.findOne({ _id: user_id });
      const currentContacts = user.emergencyContacts.toObject();
      if (
        !currentContacts.includes({
          id: reqContact._id,
          name: reqContact.name,
          email: reqContact.email,
        })
      ) {
        update = await User.findOneAndUpdate(
          { _id: user_id },
          {
            $push: {
              emergencyContacts: {
                id: reqContact._id,
                name: reqContact.name,
                email: reqContact.email,
              },
            },
          }
        );
        const token = await createToken(user_id);
        res.status(200).json({ message: "OK", token: token });
        return;
      } else {
        res.status(400).json({
          error: "You already have that user in your emergency contact list",
        });
        return;
      }
    }
    if (field === "delete") {
      update = await User.findOneAndUpdate(
        { _id: user_id },
        {
          $pull: {
            emergencyContacts: {
              id: reqContact._id,
              name: reqContact.name,
              email: reqContact.email,
            },
          },
        }
      );
      const token = await createToken(user_id);
      res.status(200).json({ message: "OK", token: token });
      return;
    } else {
      res.status(400).json({ error: "Deleting emergency contact unsuccesful" });
      return;
    }
  }
};

const getEmergencyContacts = async (req, res) => {
  const user_id = req.params.id;
  console.log(user_id);
  try {
    const user = await User.findById(user_id);
    res.status(200).json({ emergencyContacts: user.emergencyContacts });
  } catch (error) {
    res.status(404).json({ error: "This user no longer exists" });
  }
};

const getSearchResults = async (req, res) => {
  const query = req.params.query;
  console.log(query);
  const emailList = await User.find({ email: { $regex: `.*${query}.*` } });
  console.log(emailList);
  res.status(200).json({ data: emailList });
};

const addNotification = async (req, res) => {
  const { receiver_id } = req.params;
  const { notification } = req.body;
  const receiver = await User.findOne({ _id: receiver_id });
  if (!receiver) {
    return res.status(400).json({ error: "User not found" });
  }
  receiver.notifications.push(notification);
  await receiver.save();
  res.status(200).json({
    message: "Notification added!",
    updatedNotification: receiver.notifications,
  });
};

const deleteNotification = async (req, res) => {
  const { user_id, notification_index } = req.params;
  const user = await User.findOne({ _id: user_id });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  user.notifications.splice(notification_index, 1);
  await user.save();
  res
    .status(200)
    .json({
      message: "Notification deleted",
      updatedNotifications: user.notifications,
    });
};

const getNotifications = async (req, res) => {
  const user_id = req.params.id;
  try {
    const user = await User.findById(user_id);
    res.status(200).json({ emergencyContacts: user.emergencyContacts });
  } catch (error) {
    res.status(404).json({ error: "This user no longer exists" });
  }
};

module.exports = {
  signupUser,
  loginUser,
  emergencyContact,
  getEmergencyContacts,
  getSearchResults,
  addNotification,
  deleteNotification,
  getNotifications,
};
