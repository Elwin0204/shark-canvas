import { InjectParams } from "@/typings/core";
import React from "react";

// 子组件注入数据
export function childrenInjectProps(params?: InjectParams, children?: JSX.Element | JSX.Element[]) {
  if(children instanceof Array) {
    return children.map((child) => {
      return React.Children.toArray(child).map((el: any) => React.cloneElement(el, { ...params }));
    });
  } else {
    return React.Children.toArray(children).map((el: any) => React.cloneElement(el, { ...params }));
  }
}