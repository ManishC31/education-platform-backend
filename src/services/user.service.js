import SQL from "sql-template-strings";
import poolDB from "../config/db.config.js";
import bcrypt from "bcryptjs";
import { SentenceCase } from "../utils/customFunctions.js";

export class User {
  static async getUserById(id) {
    const client = await poolDB.connect();
    try {
      const query = SQL`select * from users where id = ${id}`;
      const response = await client.query(query);

      if (response.length < 1) {
        throw new Error(`No user found with id ${id}`);
      }

      return response[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  static async getUserByEmail(email) {
    const client = await poolDB.connect();
    try {
      const query = SQL`select * from users where email_address = ${email}`;
      const response = await client.query(query);

      if (response.rows.length < 1) {
        throw new Error(`No user found with email : ${email}`);
      }

      return response.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  static async createUser(data) {
    const { firstname, lastname, email, password, role } = data;

    const client = await poolDB.connect();
    try {
      const existingUserResponse = (await client.query(SQL`select id from users where email_address = ${email}`)).rows;

      if (existingUserResponse.length > 0) {
        throw new Error("User already present with email address");
      }

      const encPassword = await bcrypt.hash(password, 10);

      const userResponse = await client.query(
        SQL`insert into users (firstname,lastname, email_address, password, role) values(${SentenceCase(firstname)}, ${SentenceCase(
          lastname
        )}, ${email.toLowerCase()}, ${encPassword}, ${role}) returning *`
      );

      const user = userResponse.rows[0];

      delete user.password;

      return user;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}
