import SQL from "sql-template-strings";
import poolDB from "../config/db.config.js";
import { CapitalizeWordsOfSentence, SentenceCase } from "../utils/customFunctions.js";

export class Category {
  static async createCategory(name) {
    const client = await poolDB.connect();
    try {
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
