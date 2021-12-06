interface leafInterface {
  attributes: any;
  leaf: any;
  children: any;
}

export const Leaf = ({ attributes, children, leaf }: leafInterface) => {
  return (
    <span
      {...attributes}
      {...(leaf.highlight && { "data-cy": "search-highlighted" })}
      style={{
        color: `${leaf.highlight ? "red" : ""}`,
      }}
    >
      {children}
    </span>
  );
};
