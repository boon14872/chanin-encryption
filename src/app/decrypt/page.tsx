"use client";
import { useState, useEffect } from "react";
import { base64url } from "jose";
import { MD5, SHA1, SHA256 } from "crypto-js";
import { logout } from "@/lib/auth";
import Link from "next/link";

type ResultDecrypt = {
  name: string;
  painText: string;
  decryptText: string;
};

export default function Page() {
  const initialState = {
    selectedDecryptions: [],
  };

  const [selectedDecryptions, setSelectedDecryptions] = useState<string[]>(
    initialState.selectedDecryptions
  );
  const [textToDecrypt, setTextToDecrypt] = useState<string>("");

  const handleDecryptionSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked, value } = event.target;
    if (checked) {
      setSelectedDecryptions([...selectedDecryptions, value]);
    } else {
      setSelectedDecryptions(
        selectedDecryptions.filter((decryption) => decryption !== value)
      );
    }
  };

  const listOfDecryptions = [
    {
      name: "base64",
      function: (text: string) => {
        const result = base64url.decode(text);
        const bytes = new Uint8Array(result);
        const resultString = String.fromCharCode.apply(null, Array.from(bytes));
        return resultString;
      },
    },
  ];

  const [decryptedResult, setDecryptedResult] = useState<ResultDecrypt[]>([]);

  const decryptText = (text: string): ResultDecrypt[] => {
    const lists = listOfDecryptions
      .filter((item) => selectedDecryptions.includes(item.name))
      .map((item) => item);

    const results = lists.map((item) => {
      const decryptText = item.function(text);
      return {
        name: item.name,
        painText: text,
        decryptText: decryptText.toString(),
      };
    });

    return results;
  };

  const onInputChanged = (text: string) => {
    if (text === "") {
      setDecryptedResult(decryptText(text));
      return;
    }
    setTextToDecrypt(text);
    const result = decryptText(text);
    setDecryptedResult(result);
  };

  useEffect(() => {
    const result = decryptText(textToDecrypt);
    setDecryptedResult(result);
  }, [selectedDecryptions]);

  return (
    <>
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden h-full my-2 md:container p-4 px-10 w-full">
        {/* encrypt and show output */}
        {/* header */}
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold">Decrypt</h1>
          <div className="flex md:flex-row flex-col gap-4">
            <Link href={"/encrypt"}>
              <button className="bg-violet-500 text-white rounded-md py-1 px-4 hover:bg-violet-900 transition-all shadow-md disabled:shadow-none disabled:bg-gray-400 disabled:cursor-not-allowed">
                Encrypt
              </button>
            </Link>
            <Link href={"/decrypt"}>
              <button className="bg-emerald-500 text-white rounded-md py-1 px-4 hover:bg-emerald-900 transition-all shadow-md disabled:shadow-none disabled:bg-gray-400 disabled:cursor-not-allowed">
                Decrypt
              </button>
            </Link>
            {/* sing out */}
            <button
              className=" text-red-500 rounded-md py-1 px-4 hover:text-red-900 transition-all disabled:shadow-none disabled:bg-gray-400 disabled:cursor-not-allowed"
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
            <h1 className="text-xl font-semibold mb-4">รูปแบบการเข้ารหัส</h1>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {listOfDecryptions.map((item, index) => {
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
                        onChange={handleDecryptionSelect}
                        checked={selectedDecryptions.includes(item.name)}
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
            <h1 className="text-xl font-semibold mb-4">ข้อความที่จะถอดรหัส</h1>
            <textarea
              className="border w-full border-gray-200 rounded-lg shadow-md p-2"
              placeholder="Enter your text here"
              cols={50}
              rows={1}
              onChange={(e) => onInputChanged(e.target.value)}
            ></textarea>

            {decryptedResult.length > 0 &&
              decryptedResult.map((item, index) => {
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
                          navigator.clipboard.writeText(item.decryptText)
                        }
                      >
                        Copy
                      </button>
                    </div>
                    <textarea
                      className="w-full border border-gray-200 rounded-lg shadow-md p-2"
                      placeholder="Enter your text here"
                      value={item.decryptText}
                    ></textarea>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
