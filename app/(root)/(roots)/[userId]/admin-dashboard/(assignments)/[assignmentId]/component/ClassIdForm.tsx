"use client";
import { Assignments, Classes, Leaves, Teacher } from "@prisma/client";
import React from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/common/Container";
import Heading from "@/components/common/Heading";
import { Separator } from "@/components/ui/separator";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  day: z.string().min(2).max(50),
  teacher: z.string().min(2).max(50),
  date: z.string().min(2).max(50),

  classId: z.string().min(2).max(50),
});
type Props = {
  data: Teacher[] | null;
  assign: Assignments | null;
  classes: Classes[] | null;
};

function ClassIdForm({ data, classes, assign }: Props) {
  const router = useRouter();
  const params = useParams();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day: assign ? assign.day : "",
      teacher: assign ? assign.teacher_id : "",
      date: assign ? assign.date : "",
      classId: assign ? assign.class_id : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let res;

      res = assign
        ? await axios.patch(`/api/assign/${assign.id}`, values)
        : await axios.post(`/api/assign`, values);

      if (res.data.msg) {
        toast.success(res.data.msg);
        router.push(`/${params.userId}/admin-dashboard/`);
      } else toast.error(res.data);

      setTimeout(() => {
        router.refresh();
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Api error");
    }
  }

  const item = {
    title: assign ? "Update Assignment" : "Assign New Teacher",
    submit: assign ? "Update" : "Assign",
    description: assign
      ? "you can update assignment"
      : "you can assign new teacher",
  };

  return (
    <div>
      <Toaster richColors />
      <Container className="py-10 space-y-5">
        <div className="top flex items-center justify-between">
          <Heading title={item.title} description={item.description} />
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <div className="grid grid-cols-2 gap-10">
              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified Teacher to assign class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {data?.map((item) => (
                          <SelectItem value={item.id} key={item.id}>
                            {item.firstName + " " + item.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription>Please Select the Teacher</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="classId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified Cass for Teacher" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {classes?.map((item) => (
                          <SelectItem value={item.id} key={item.id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription>Please Select the Class</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Date </FormLabel>
                    <FormControl>
                      <Input placeholder="12-4-2024" {...field} type="date" />
                    </FormControl>
                    <FormDescription>select a valid date</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified Day for Teacher" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sunday" key="sunday">
                          Sunday
                        </SelectItem>
                        <SelectItem value="monday" key="monday">
                          Monday
                        </SelectItem>
                        <SelectItem value="tuesday" key="tuesday">
                          Tuesday
                        </SelectItem>
                        <SelectItem value="wednesday" key="wednesday">
                          Wednesday
                        </SelectItem>
                        <SelectItem value="thrusday" key="thrusday">
                          Thrusday
                        </SelectItem>
                        <SelectItem value="friday" key="friday">
                          Friday
                        </SelectItem>
                        <SelectItem value="saturday" key="saturday">
                          Saturday
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormDescription>Please Select the Class</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">{item.submit}</Button>
          </form>
        </Form>
      </Container>
    </div>
  );
}

export default ClassIdForm;
