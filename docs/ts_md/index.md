<!--
 * @Author: xianglc1 298198256@qq.com
 * @Date: 2022-09-23 09:27:08
 * @LastEditors: xianglc1 298198256@qq.com
 * @LastEditTime: 2022-09-24 22:28:42
 * @FilePath: \study_note\docs\ts_md\index.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# TypeScript

## 关于typeof与interface的理解

```typescript

/**
 * 用interface描述**数据结构**，用type描述**类型关系**
 * 使用interface时主要用于描述数据的结果， 
 * 如果需要对不同的类型进行处理，也就是描述不同的类型他们之间的关系，
 * 此时，使用type ，相应的由于这种设定， 像一些类型操作符（in, keyof）
 * 只能在type声明下使用
 */

```

## 关于keyof的个人理解

   ```typescript
   type Record<K extends keyof any, T> = {
       [P in K]: T;
   };
   interface A {
       name: any;
       age: any;
   }
   interface B {
       [key in string]: any
   }
   /* 
   *	首先需要理解keyof关键字的含义
   *	对于任意类型，那么他的键值只能是三种类型（string, number, Symbol()）
   * 	keyof关键字用于提取一个的类型中的所有键的类型并合并为一个联合类型，此处应该注意一点
   *   keyof A // 提取出来的字符串不能视为值，应该将其视为类型，其键值只能为'name'或'age'的类型
   *   keyof B // 提取出来的键值联合类型是string，
   */
   
   ```

## 关于in关键字的理解

   ```
   type Record<K extends keyof any, T> = {
       [P in K]: T;
   };
   // 对于Record中的in关键字， 参照上面的理解，就是对象的键的类型可以是string|number|Symbol()中的一种
   ```

## 对于typeof关键字的理解

   ```typescript
   // JS中的typeof：在运行时判断类型
   // TS中的typeof：在编译时获取类型
   interface Person {
       name: string,
       age: number,
   }
   let person: Person = { name: 'tao', age: 18 }
   //两者一样
   type p1 = typeof person  
   type p2 = Person
   
   ```
