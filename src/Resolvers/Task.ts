import { Task } from "../entities/Task";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class TaskResolver {
    @Query(() => [Task])
    tasks(): Promise<Task[]> {
        return Task.find({});
    }


    ///get by Id not Working 
    @Query(() => Task, { nullable: true })
    async taskById(
        @Arg("id", () => Int)
        id: number
    ): Promise<Task | null> {
        return await Task.findOne({
            where: { id: id }
        })
    }

    //Create  Task
    @Mutation(() => Task)
    async createTask(
        @Arg("title", () => String)
        title: string
    ): Promise<Task> {
        return await Task.create({ title, isComplete: false }).save();
    }


    //delete task
    @Mutation(() => Boolean)
    async deleteTask(
        @Arg("id", () => Int)
        id: number
    ): Promise<boolean> {
        try {
            Task.delete({ id });
            return await true;
        } catch {
            return await false;
        }
    }

    @Mutation(() => Boolean, { nullable: true })
    async updateTask(
        @Arg("id", () => Int)
        id: number,

        @Arg("isComplete", () => Boolean)
        isComplete: boolean
    ): Promise<boolean | null> {
        const task = Task.findOne({
            where: {
                id: id
            }
        })
        if (!task) {
            return await null;
        }
        try {
            await Task.update({ id }, { isComplete })
            return true;
        } catch {
            return false;
        }

    }
}
