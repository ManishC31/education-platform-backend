import SQL from "sql-template-strings";
import poolDB from "../config/db.config.js";
import { CapitalizeWordsOfSentence } from "../utils/customFunctions.js";

export class Category {
  static async getCategoryById(id) {
    const client = await poolDB.connect();
    try {
      const query = SQL`select * from category where id= ${id}`;
      const response = await client.query(query);

      if (response.rows.length < 1) {
        throw new Error(`No category found with id ${id}`);
      }

      return response.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  static async getCategoryByName(name) {
    const client = await poolDB.connect();
    try {
      const query = SQL`select * from category where name= ${name}`;
      const response = await client.query(query);

      if (response.rows.length < 1) {
        throw new Error(`No category found with name: ${name}`);
      }

      return response.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }

  static async createCategory(name) {
    const client = await poolDB.connect();
    try {
      const existingCategory = await client.query(SQL`select * from category where lower(name) = lower(${name})`);

      if (existingCategory.rows.length > 0) {
        throw new Error("Category is already present");
      }

      const query = SQL`insert into category(name) values (${CapitalizeWordsOfSentence(name)}) returning *`;
      const response = await client.query(query);

      return response.rows[0];
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}
