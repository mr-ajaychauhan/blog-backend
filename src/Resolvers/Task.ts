import { Query, Resolver } from "type-graphql";

@Resolver()
export class TaskResolver {
    @Query(() => [String])
    async Task() {
        let task:string[];
        task = ["homecleaning", "bartandhona", "Khanabanana", "kapdedhona"];
        return task;
    }
}