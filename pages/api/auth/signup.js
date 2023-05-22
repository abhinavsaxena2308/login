import connectMongo from '../../../database/conn';
import Users from '../../../model/Schema';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  try {
    await connectMongo(); // Establish database connection

    // Only accept POST method
    if (req.method === 'POST') {
      if (!req.body) {
        return res.status(404).json({ error: "Don't have form data...!" });
      }

      const { username, email, password } = req.body;

      // Check if user already exists
      const checkExisting = await Users.findOne({ email });
      if (checkExisting) {
        return res.status(422).json({ message: "User Already Exists...!" });
      }

      // Hash the password
      const hashedPassword = await hash(password, 12);

      // Create the new user
      const newUser = await Users.create({ username, email, password: hashedPassword });

      res.status(200).json({ status: true, user: newUser });
    } else {
      res.status(500).json({ message: "HTTP method not valid, only POST accepted" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
