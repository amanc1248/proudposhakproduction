-- Select rows from a Table or View 'TableOrViewName' in schema 'SchemaName'
select *
from product_type
where product_type_id=1;
select *
from size_attributes
    join product_type_size_attributes on size_attributes.size_attributes_id = product_type_size_attributes.size_attributes_id
where product_type_size_attributes.product_type_id=1;

