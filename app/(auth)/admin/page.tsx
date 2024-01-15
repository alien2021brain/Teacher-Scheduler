"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  emailId: z
    .string()
    .min(1, { message: "contain atleast 1 character" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(4, { message: "password should contain atleast 4 character" }),
});

function Login() {
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post("/api/admin/login", values);
    console.log(res.data);
    if (res.data) {
      toast.success(res.data)
      router.push("/");
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailId: "",
      password: "",
    },
  });

  return (
    <div className="flex justify-center items-center h-screen ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
          <div className="shadow-md  grid grid-cols-1 p-5 rounded-md gap-x-10 gap-y-5 ">
            <FormField
              control={form.control}
              name="emailId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="teacherabc@gmail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="xxxxxxx" {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="-mt-5">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Login;
