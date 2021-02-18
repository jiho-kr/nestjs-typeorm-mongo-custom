# nestjs-typeorm-mongo-custom
mongo custom processing using nestjs, typeorm


## switch Database & find Cursor
```
const func = (doc: any) => {
  ...
};

await MongoQueryService.findCursor(
      getConnection(Database.NAME),
      database,
      this.Repository.metadata.tableName,
      func,
      query,
      project,
    );
```
