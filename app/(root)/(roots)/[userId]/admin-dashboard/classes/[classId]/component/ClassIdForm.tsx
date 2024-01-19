"use client";
import { Classes } from "@prisma/client";
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

const formSchema = z.object({
  name: z.string().min(2).max(50),
});
type Props = {
  data: Classes | null;
};

function ClassIdForm({ data }: Props) {
  const router = useRouter();
  const params = useParams();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data ? data.name : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = data
        ? await axios.patch(`/api/classes/${params.classId}`, values)
        : await axios.post(`/api/classes`, values);

      if (res.data.msg) {
        toast.success(res.data.msg);
      } else toast.error(res.data);
      router.refresh();
      setTimeout(() => {
        router.push(`/${params.userId}/admin-dashboard/classes`);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Api error");
    }
  }

  const item = {
    title: data ? "Update Classes" : "Create New Classes",
    submit: data ? "Update" : "Create",
    description: data
      ? "you can update your class here"
      : "you can create new classes here",
  };

  return (
    <div>
      <Toaster richColors />
      <Container className="py-10 space-y-5">
        <div className="top flex items-center justify-between">
          <Heading title={item.title} description={item.description} />
          <Button variant={"destructive"}>Delete Class</Button>
        </div>
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Class A" {...field} className="w-1/2" />
                  </FormControl>
                  <FormDescription>This is your class name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Container>
    </div>
  );
}

export default ClassIdForm;
