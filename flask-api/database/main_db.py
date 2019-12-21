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
            self.__create_table({
                'person_name': 'VARCHAR(255)',
                'parent_name': 'VARCHAR(255)',
                'family_name': 'VARCHAR(255)'
            })
        if not self._name_in_table('families'):
            self.__create_table({
                'family_id': 'INT',
                'family_name': 'VARCHAR(255)'
            })
        if not self._name_in_table('profile'):
            self.__create_table({
                'name_attr': 'VARCHAR(255)',
                'attr': 'VARCHAR(255)',
                'person_name': 'VARCHAR(255)'
            })

    def __del__(self):
        self.db_connection.close()

    def _name_in_table(self, name: str) -> bool:
        """
            param:  name [str]
            return: [bool]

            Return the condition if passed name is the name of a table within the database connection
        """
        self.cursor.execute('SELECT `table_name` FROM `information_schema.TABLES`')
        table_names = self.cursor.fetchall()
        return tuple([name]) in table_names

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
