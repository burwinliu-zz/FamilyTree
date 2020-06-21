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

        if not self._name_in_table('members'):
            self.__create_table('members', {
                'PersonName': 'VARCHAR(255)',
                'parent_name': 'VARCHAR(255)',
                'family_name': 'VARCHAR(255)'
            })
        if not self._name_in_table('families'):
            self.__create_table('families', {
                'FamilyID': 'INT',
                'FamilyName': 'VARCHAR(255)'
            })
        if not self._name_in_table('profile'):
            self.__create_table('profile', {
                'NameAttr': 'VARCHAR(255)',
                'Attr': 'VARCHAR(255)',
                'PersonName': 'VARCHAR(255)'
            })

    def __del__(self):
        self.db_connection.close()

    def input_row(self, table_name: str, info: dict):
        """
            Given table name, assuming the info matches the tables, input the row into the table
        """

    def update_row(self, table_name: str, column_search: str, query: str, info: dict):
        """
            Given table name, assuming the info matches the tables, update the row into the table with matching query
        """

    def get_row_many(self, table_name: str, column_search: str, query: str):
        """
            Given the table_name and column to search, return all rows with the matching query
        """

    def get_row(self, table_name: str, column_search: str, query: str):
        """
            Given the table_name and column to search, return the row with the given query (Assume all items are
            unique in this column)
        """

    def _name_in_table(self, name: str) -> bool:
        """
            param:  name [str]
            return: [bool]

            Return the condition if passed name is the name of a table within the database connection
        """
        self.cursor.execute('USE information_schema;')
        self.cursor.execute('show tables;')
        self.cursor.execute("SELECT TABLE_NAME FROM columns where TABLE_NAME = %s;", (name,))
        self.cursor.execute('USE familytree;')
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
        # TODO make a cursor execute a TABLE CREATE method with all specifications in docs. PREVENT SQL INJECTION
        #  ATTACK
        # self.cursor.execute(f'CREATE TABLE %s (')
