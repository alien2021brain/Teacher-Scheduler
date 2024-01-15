"use client";

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
import { Teacher } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  emailId: z.string().min(1).max(50),
  days: z.string().min(1).max(50),
});

type Props = {
  data: Teacher | null;
};

function TeacherForm({ data }: Props) {
  const router = useRouter();
  const params = useParams();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: data ? data.firstName : "",
      lastName: data ? data.lastName : "",

      emailId: data ? data.emailId : "",
      days: data ? data.days : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.patch(`/api/teachers/${data?.id}`, values);

      if (res.data.msg) {
        toast.success(res.data.msg);
      } else toast.error(res.data);
      router.refresh();
      setTimeout(() => {
        router.push(`/`);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Api error");
    }
  }

  const item = {
    title: data ? "Update Details" : "",
    submit: data ? "Update" : "",
    description: data ? "you can update your details here" : "",
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Class A"
                        {...field}
                        className="w-1/2"
                      />
                    </FormControl>
                    <FormDescription>This is your class name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Class A"
                        {...field}
                        className="w-1/2"
                      />
                    </FormControl>
                    <FormDescription>This is your last name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Class A"
                        {...field}
                        className="w-1/2"
                      />
                    </FormControl>
                    <FormDescription>This is your email.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="days"
                render={({ field }) => (
                  <FormItem className="w-1/2">
                    <FormLabel>Days</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select no of days" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 Day</SelectItem>
                        <SelectItem value="2">2 Day</SelectItem>
                        <SelectItem value="3">3 Day</SelectItem>
                        <SelectItem value="4">4 Day</SelectItem>
                        <SelectItem value="5">5 Day</SelectItem>
                        <SelectItem value="6">6 Day</SelectItem>
                        <SelectItem value="7">6 Day</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>You can manage days</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Container>
    </div>
  );
}

export default TeacherForm;
