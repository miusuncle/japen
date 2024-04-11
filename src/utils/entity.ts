/**
 * 表示类型为 `T` 的对象集合
 */
export interface EntityMap<T> {
  [key: string]: T;
}

/**
 * 表示类型为 `T` 的实体集合
 *
 * `list` 字段维护集合的顺序
 * `entities` 字段维护集合的数据
 *
 * 可以通过 `createEntityCollection()` 和 `convertToEntityList()` 来互相转换普通数据和实体集合
 */
export interface EntityCollection<T> {
  list: string[];
  entities: EntityMap<T>;
}

/**
 * 从数组创建一个 EntityCollection
 */
export type CreateEntityCollection<T> = (
  /** 实体列表 */
  entityList: T[],

  /** 提供一个函数，确定数组的每个元素如何确定其标识 */
  keySelector: (t: T) => string,
) => EntityCollection<T>;

/**
 * 从数组创建一个 EntityCollection
 */
export const createEntityCollection = <T>(
  entityList: T[],
  keySelector: (t: T) => string,
): EntityCollection<T> => {
  return {
    list: entityList.map(t => keySelector(t)),
    entities: entityList.reduce<EntityMap<T>>((ret, item) => {
      ret[keySelector(item)] = item;
      return ret;
    }, {}),
  };
};

/**
 * 将 EntityCollection 集合转换为普通数组
 */
export const convertToEntityList = <T>(collection: EntityCollection<T>): T[] => {
  return collection.list.map(key => collection.entities[key]);
};
