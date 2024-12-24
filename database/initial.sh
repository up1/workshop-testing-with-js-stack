sleep 10s
/opt/mssql-tools18/bin/sqlcmd -S db -Usa -PxitgmLwmp123 -C -d myusers -i /works/setup.sql
if [ $? -eq 0 ]
then
    echo "setup.sql completed"
    break
else
    echo "not ready yet..."
    sleep 1
fi