---
id: 0efny
name: Database Entities
file_version: 1.0.2
app_version: 0.7.2-1
file_blobs:
  server/src/entities/User.ts: fe90787535ba1ef050faa410313db6229ad7646f
---

this is the User entity, we barely have data there but that's probably for the best.

<br/>

<!-- NOTE-swimm-snippet: the lines below link your snippet to Swimm -->
### 📄 server/src/entities/User.ts
```typescript
⬜ 1      import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
⬜ 2      import { Field, ObjectType } from "type-graphql";
🟩 3      
🟩 4      @ObjectType()
🟩 5      @Entity()
🟩 6      export class User {
🟩 7        @Field()
🟩 8        @PrimaryKey()
🟩 9        id!: number;
🟩 10     
🟩 11       @Field(() => String)
🟩 12       @Property({ type: "date" })
🟩 13       createdAt = new Date();
🟩 14     
🟩 15       @Field(() => String)
🟩 16       @Property({ type: "date", onUpdate: () => new Date() })
🟩 17       updatedAt = new Date();
🟩 18     
🟩 19       @Field()
🟩 20       @Property({ type: "text", unique: true })
🟩 21       username!: string;
🟩 22     
🟩 23       @Property({ type: "password" })
🟩 24       password!: string;
🟩 25     }
⬜ 26     
```

<br/>

This file was generated by Swimm. [Click here to view it in the app](https://app.swimm.io/repos/Z2l0aHViJTNBJTNBTm90aW9uU21hcnRBc3Npc3RhbnQlM0ElM0FpYnJhaGVlbXNhb3Vk/docs/0efny).