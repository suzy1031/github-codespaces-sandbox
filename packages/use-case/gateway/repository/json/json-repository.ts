export class JsonRepository {
  protected calculateNewId(records: any[]): number {
    if (records.length === 0) {
      return records.length + 1;
    }

    const lastRecord = records[records.length - 1];
    if (lastRecord?.id) {
      return lastRecord.id + 1;
    }
    throw new Error("Record has no id");
  }
}
