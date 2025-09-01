import SQL from "sql-template-strings";
import poolDB from "../config/db.config.js";
import { v4 as uuidv4 } from "uuid";

export class Course {
  static async createCourse(courseDetails, fileName) {
    const client = await poolDB.connect();
    try {
      const {
        title,
        titleDescription,
        courseDescription,
        whatToLearn,
        requirements,
        intendedFor,
        isCertificateIncluded,
        price,
        discountPercentage,
        language,
        instructorId,
        categoryId,
      } = courseDetails;

      // start a transaction
      await client.query("BEGIN");

      const coursePrice = price - price * discountPercentage;

      const courseQuery = SQL`insert into courses (course_id, title, title_description, instructor_id, price, discount, final_price, category_id, what_to_learn, requirements, intended_for, course_description, is_certification_included, language) values (
      ${uuidv4()}, ${title}, ${titleDescription}, ${instructorId}, ${price}, ${discountPercentage}, ${coursePrice}, ${categoryId}, ${whatToLearn}, ${requirements}, ${intendedFor},
      ${courseDescription}, ${isCertificateIncluded}, ${language}
      ) returning *`;

      const courseResponse = await client.query(courseQuery);

      const courseData = courseResponse.rows[0];
      console.log("courseData:", courseData);
    } catch (error) {
      // rollback a transaction
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}
