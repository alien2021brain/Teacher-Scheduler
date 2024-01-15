"use client";
import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
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
import Link from "next/link";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "name must be contain 1 character" }),
    lastName: z.string().min(1, { message: "contain atleast 1 character" }),
    password: z
      .string()
      .min(4, { message: "password should contain atleast 4 character" }),
    confirmPassword: z
      .string()
      .min(1, { message: "confirm password is required" }),
    emailId: z.string().min(1, { message: "contain atleast 1 character" }),
    days: z.string().min(1, { message: "please select day" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password donot match",
  });

function Signup() {
  const Router = useRouter();
  // onSubmit function

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post("/api/signup", values);
      if (res.data.msg) {
        toast.success(res.data.msg);
        Router.push("/");
        setTimeout(() => {
          Router.refresh();
        }, 2000);
      } else {
        toast.error(`something went wrong ${res.data.msg}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Internal error`);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      emailId: "",
      days: "",
    },
  });

  return (
    <div className="flex justify-center   ">
      <Toaster richColors={true} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
          <div className="shadow-md  grid grid-cols-1 p-5 rounded-md gap-x-10 gap-y-5 mt-10">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>firstName</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>lastName</FormLabel>
                  <FormControl>
                    <Input placeholder="Anjali Pandey" {...field} />
                  </FormControl>

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
                    <Input placeholder="Anjali@gmail.com" {...field} />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="xxxxxxx" {...field} type="password" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="days"
              render={({ field }) => (
                <FormItem>
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
                    </SelectContent>
                  </Select>
                  <FormDescription>You can manage days</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between gap-5 items-baseline">
            <Button type="submit" className="-mt-5">
              Submit
            </Button>
            <Link href={"/login"} className=" text-muted-foreground">
              {" "}
              Alredy have an account ?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Signup;
