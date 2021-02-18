import { Connection } from 'typeorm';
import { MongoQueryRunner } from 'typeorm/driver/mongodb/MongoQueryRunner';

export class MongoQueryService {
  /**
   * switch Database & find iterator
   * @param {Connection} connection getConnection(Database.NAMES.DATALAKE)
   * @param {string} database Database Name
   * @param {string} collection Collection Name
   * @param {Function} func Function to process document
   * @param {object} query
   * @param {object} project
   * @param {number} skip
   * @param {number} limit
   * @param {number} batchSize
   */
  public static async findCursor(
    connection: Connection,
    database: string,
    collection: string,
    func: (doc: any) => void,
    query = {},
    project = {},
    skip = 0,
    limit = 10,
    batchSize = 100,
  ) {
    const mongoRunner = connection.createQueryRunner() as MongoQueryRunner;
    const cursor = mongoRunner.databaseConnection
      .db(database)
      .collection(collection)
      .find(query)
      .project(project)
      .skip(skip)
      .limit(limit)
      .batchSize(batchSize);
    while (await cursor.hasNext()) {
      const doc = await cursor.next();
      func(doc);
    }
    await cursor.close();
  }
}
