/opt/mssql-tools18/bin/sqlcmd -S localhost -Usa -PxitgmLwmp123 -C -d myusers -i setup.sql
if [ $? -eq 0 ]
then
    echo "setup.sql completed"
    break
else
    echo "not ready yet..."
    sleep 1
fi