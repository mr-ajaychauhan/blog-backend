import { Task } from "src/entities/Task";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TaskResolver {
    @Query(() => [String])
    async Task() {
        let task: string[];
        task = ["homecleaning", "bartandhona", "Khanabanana", "kapdedhona"];
        return task;
    }

    @Mutation(() => Task)
    createTask(
        @Arg("title", () => String)
        title: string
    ):Promise<Task> {
        return Task.create({ title, isComplete: false }).save();
    }
}