"use client";
import { logout } from "@/lib/auth";
import { MD5, SHA1, SHA256 } from "crypto-js";
import { base64url } from "jose";
import Link from "next/link";
import { useEffect, useState } from "react";
// Interfaces for types
type Result = {
  name: string;
  painText: string;
  text: string;
};

export function TemplateApp({
  RenderResult,
  type,
  title,
}: {
  RenderResult?: (resultArray: Result[]) => JSX.Element;
  title: string;
  type: "encrypt" | "decrypt";
}) {
  // Define your initial state
  const initialState = {
    selected: [],
  };
  const [selected, setSelected] = useState<string[]>(initialState.selected);

  const [text, setText] = useState<string>("");

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelected([...selected, value]);
    } else {
      setSelected(selected.filter((val) => val !== value));
    }
  };

  const functions =
    type == "encrypt"
      ? [
          {
            name: "md5",
            function: MD5,
          },
          {
            name: "sha1",
            function: SHA1,
          },
          {
            name: "sha256",
            function: SHA256,
          },
          {
            name: "base64",
            function: base64url.encode,
          },
        ]
      : type == "decrypt"
      ? [
          {
            name: "base64",
            function: (text: string) => {
              return String.fromCharCode.apply(
                null,
                Array.from(new Uint8Array(base64url.decode(text)))
              );
            },
          },
        ]
      : [];

  const [resultArray, setResultArray] = useState<Result[]>([]);

  const runFunctions = (text: string): Result[] => {
    const lists = functions
      .filter((item) => selected.includes(item.name))
      .map((item) => item);

    const results = lists.map((item) => {
      let encryptText = "";
      try {
        encryptText = item.function(text).toString();
        console.log(encryptText);
      } catch (error) {
        encryptText = "";
      }
      return {
        name: item.name,
        painText: text,
        text: text ? encryptText.toString() : "",
      };
    });
    return results;
  };

  const onInputChanged = (text: string) => {
    if (text === "") {
      setResultArray([]);
      return;
    }
    setText(text);
    const results = runFunctions(text);

    setResultArray(results);
  };

  useEffect(() => {
    const results = runFunctions(text);
    setResultArray(results);
  }, [selected]);

  const navLink = [
    {
      name: "Encrypt",
      href: "/encrypt",
    },
    {
      name: "Decrypt",
      href: "/decrypt",
    },
  ];

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden my-2 md:container p-4 px-10 w-full dark:bg-gray-800 dark:text-white h-full min-h-max py-5">
        {/* encrypt and show output */}
        {/* header */}
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <div className="flex md:flex-row flex-col gap-4">
            {navLink.map((item, index) => {
              return (
                <Link
                  href={item.href}
                  key={index}
                  className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-all"
                >
                  <button className="bg-violet-500 text-white rounded-md py-1 px-4 hover:bg-violet-900 transition-all shadow-md disabled:shadow-none disabled:bg-gray-400 disabled:cursor-not-allowed">
                    {item.name}
                  </button>
                </Link>
              );
            })}
            {/* sing out */}
            <button
              className=" text-red-500 rounded-md py-1 px-4 hover:text-red-900 transition-all disabled:shadow-none disabled:bg-gray-400 disabled:cursor-not-allowed bg-gray-200"
              onClick={() => {
                logout();
              }}
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
        {/* hr line */}
        <hr className="border-violet-500 border-opacity-50 border-2 shadow-md rounded-md my-4" />

        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex flex-col md:border-r border-gray-200 dark:border-gray-600 pr-8">
            <h1 className="text-xl font-semibold mb-4">Type of {title}</h1>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {functions.map((item, index) => {
                return (
                  <li
                    className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                    key={index}
                  >
                    <div className="flex items-center ps-3">
                      <input
                        id={item.name}
                        type="checkbox"
                        value={item.name}
                        onChange={handleSelect}
                        checked={selected.includes(item.name)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor={item.name}
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {item.name}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col justify-center items-start w-full">
            <h1 className="text-xl font-semibold mb-4">Text for {title}</h1>
            <textarea
              className="border w-full border-gray-200 rounded-lg shadow-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your text here"
              cols={50}
              rows={1}
              onChange={(e) => onInputChanged(e.target.value)}
            ></textarea>

            {RenderResult ? (
              RenderResult(resultArray)
            ) : (
              <div className="flex flex-col gap-4 w-full">
                {resultArray.length > 0 &&
                  resultArray.map((item, index) => {
                    console.log(item);
                    return (
                      <div
                        className="flex flex-col justify-center items-center w-full mt-3"
                        key={index}
                      >
                        {/* hr */}
                        <hr className="border-gray-200 border-opacity-50 border-1 shadow-md rounded-md my-4 w-full" />
                        <div className="flex flex-row justify-between w-full">
                          <h1 className="text-xl font-semibold mb-4">
                            ผลลัพธ์ : {item.name}
                          </h1>
                          {/* copy button */}
                          <button
                            className="bg-violet-500 text-white rounded-md h-8 px-2 text-xs hover:bg-violet-900 transition-all shadow-md disabled:shadow-none disabled:bg-gray-400 disabled:cursor-not-allowed"
                            onClick={() =>
                              navigator.clipboard.writeText(item.text)
                            }
                          >
                            Copy
                          </button>
                        </div>
                        <textarea
                          className="w-full border border-gray-200 rounded-lg shadow-md p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="the result will be here"
                          name={item.name}
                          readOnly
                          value={item.text}
                        ></textarea>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
