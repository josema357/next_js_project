"use client";

import { GlobalContext } from "@/context/Context";
import { addProduct, updateProduct } from "@/services/api/products";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";
import Swal from "sweetalert2";

export default function FormProduct({ product }) {
  const formRef = useRef(null);
  const context = useContext(GlobalContext);
  const router = useRouter();
  /**
   * Obteniedo los datos del formulario
   * @param {*} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const data = {
      title: formData.get("title"),
      price: parseInt(formData.get("price")),
      description: formData.get("description"),
      categoryId: parseInt(formData.get("category")),
      //images: [formData.get("images").name],
      images: [formData.get("images")],
    };

    context.setOpenForm(false);
    if (product) {
      updateProduct(product?.id, data).then((response) => {
        console.log(response);
        Swal.fire({
          text: "Updated product",
          icon: "success",
        })
          .then((result) => {
            if (result.isConfirmed) {
              router.push('/dashboard/products');
            }
          })
          .catch(() => {
            Swal.fire({
              icon: "error",
              text: "Something went wrong!",
            });
          });
      });
    } else {
      addProduct(data)
        .then(() => {
          Swal.fire({
            text: "Added product",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              context.setReloadAllProducts(!context.reloadAllProducts);
            }
          });
        })
        .catch(() => {
          Swal.fire({
            icon: "error",
            text: "Something went wrong!",
          });
        });
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="overflow-hidden">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                required
                type="text"
                name="title"
                id="title"
                defaultValue={product?.title}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                required
                type="number"
                name="price"
                id="price"
                defaultValue={product?.price}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                required
                id="category"
                name="category"
                autoComplete="category-name"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="1">Clothes</option>
                <option value="2">Electronics</option>
                <option value="3">Furniture</option>
                <option value="4">Toys</option>
                <option value="5">Others</option>
              </select>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                required
                name="description"
                id="description"
                autoComplete="description"
                rows="3"
                defaultValue={product?.description}
                className="form-textarea mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div className="col-span-6">
              <div>
                <p className="block text-sm font-medium text-gray-700">
                  Cover photo
                </p>
                <input
                  required
                  type="text"
                  name="images"
                  id="images"
                  placeholder="Enter a URL"
                  defaultValue={product?.images?.[0]}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />

                {/* 
                ESTE CODIGO ERA PARA AGREGAR UNA IMAGEN CON EL INPUT TYPE FILE 
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="images"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="images"
                          name="images"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
