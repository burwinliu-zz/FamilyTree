# /database/main_db.py

import pymysql


class DbHelper:
    def __init__(self, host_in: str, user_in: str, password_in: str, db_in: str):
        """
            param: host_in      [str]
            param: user_in      [str]
            param: password_in  [str]
            param: db_in        [str]

            Initialize this database object. Act as a layer of abstraction for all the necessary functions that this
            server will have.
        """
        self.db_connection = pymysql.Connect(host=host_in,
                                             user=user_in,
                                             password=password_in,
                                             db=db_in)
        self.cursor = self.db_connection.cursor()
        self.db = db_in

        if not self._name_in_table('family_info'):
            self.__create_table('family_info', {
                'person_id': 'INT',
                'parent_name': 'VARCHAR(255)',
                'family_id': 'INT',
            })
        if not self._name_in_table('profile'):
            self.__create_table('profile', {
                'name_attr': 'VARCHAR(255)',
                'attr': 'VARCHAR(255)',
                'person_id': 'INT'
            })
        if not self._name_in_table('people'):
            self.__create_table('people', {
                'person_name': 'VARCHAR(255)',
                'person_id': 'INT'
            })
        if not self._name_in_table('families'):
            self.__create_table('families', {
                'family_name': 'VARCHAR(255)',
                'family_id': 'INT',
            })

    def input_row(self, table_name: str, info: dict):
        """
            Given table name, assuming the info matches the tables, input the row into the table

            info should be dict: Column: value
        """
        # may cause issues todo test this
        # Done to sanitize the inputs
        try:
            keys = ",".join([f"{i}" for i in info.keys()])
            values = ",".join([f"'{i}'" for i in info.values()])

            self.cursor.execute(f"USE {self.db};")
            self.cursor.execute(f"INSERT INTO {table_name}({keys}) VALUES({values});")
            self.db_connection.commit()
        except Exception as e:
            print(self.cursor._last_executed)
            raise e


    def update_row(self, table_name: str, column_name: str, criteria: str, info: dict):
        """
            Given table name, assuming the info matches the tables, update the row into the table

            info should be dict: Column: value
        """
        # may cause issues todo test this
        to_join = [f"{i} = '{j}'" for i, j in info.items()]

        self.cursor.execute(f"USE {self.db};")
        self.cursor.execute(f"UPDATE {table_name}")
        self.cursor.execute(f"SET {','.join(to_join)}")
        self.cursor.execute(f"WHERE {column_name} = {criteria}")
        self.db_connection.commit()

    def update_row_multi_criteria(self, table_name: str, column_name: list, criteria: list, info: dict):
        """
            Given table name, assuming the info matches the tables, update the row into the table

            info should be dict: Column: value
        """
        to_join = [f"{i} = '{j}'" for i, j in info.items()]
        to_join_criteria = [f"{i} = '{j}'" for i, j in zip(column_name, criteria)]
        self.cursor.execute(f"USE {self.db};")
        self.cursor.execute(f"UPDATE {table_name} "
                            f"SET {','.join(to_join)} "
                            f"WHERE {' AND '.join(to_join_criteria)};")
        self.db_connection.commit()

    def get_row(self, table_name: str, column_search: str, query: str, fuzzy: bool = False):
        """
            Given the table_name and column to search, return the row with the given query (Assume all items are
            unique in this column)
        """
        self.cursor.execute(f"USE {self.db};")
        if fuzzy:
            self.cursor.execute(f"SELECT * FROM {table_name} WHERE {column_search} LIKE %s", (query,))
        else:
            self.cursor.execute(f"SELECT * FROM {table_name} WHERE {column_search} = %s", (query,))
        return self.cursor.fetchall()

    def _name_in_table(self, name: str) -> bool:
        """
            param:  name [str]
            return: [bool]

            Return the condition if passed name is the name of a table within the database connection
        """
        self.cursor.execute("USE information_schema;")
        self.cursor.execute('show tables;')
        self.cursor.execute("SELECT TABLE_NAME FROM columns where TABLE_NAME = %s;", (name,))
        table_names = self.cursor.fetchall()
        return len(table_names) != 0

    def __create_table(self, table_name: str, param: dict):
        """
            param: table_name [str]
            param: param [dict[str -> str]]

            *** NOTE PLEASE DO NOT CALL FROM OUTSIDE, AND WHEN DOING SO INSIDE THE CLASS PLEASE PLEASE DO NOT USE IT
            WITHOUT GOOD REASON, DESIGNED ONLY AND ONLY FOR INIT ***

            Creates a param with many rows, according to param. The keys are the column name, and the values are the
            column types

            Anything that is called without following below will cause errors, and fail spectacularly

            Permitted types are only what are legal, listed below
                CHARACTER [(length)] or CHAR [(length)]
                VARCHAR (length)
                BOOLEAN
                SMALLINT
                INTEGER or INT
                DECIMAL [(p[,s])] or DEC [(p[,s])]
                NUMERIC [(p[,s])]
                REAL
                FLOAT(p)
                DOUBLE PRECISION
                DATE
                TIME
                TIMESTAMP
                CLOB [(length)] or CHARACTER LARGE OBJECT [(length)] or CHAR LARGE OBJECT [(length)]
                BLOB [(length)] or BINARY LARGE OBJECT [(length)]
        """
        self.cursor.execute(f"USE {self.db};")
        to_join = [f"{i} {j}" for i, j in param.items()]
        self.cursor.execute(f'CREATE TABLE {table_name} ({",".join(to_join)})')
