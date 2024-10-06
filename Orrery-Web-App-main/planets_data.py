import csv

# Function to convert CSV file to HTML table
def csv_to_html(csv_file, html_file):
    # Open the CSV file
    with open(csv_file, 'r') as file:
        reader = csv.reader(file)
        
        # Open the HTML file to write into
        with open(html_file, 'w') as html:
            html.write('<html>\n<head>\n<title></title>\n</head>\n<body>\n')
            html.write('<table border="1">\n')
            
            # Write rows in the table
            for row in reader:
                html.write('<tr>\n')
                for column in row:
                    html.write(f'<td>{column}</td>\n')
                html.write('</tr>\n')
            
            # End of table and HTML
            html.write('</table>\n')
            html.write('</body>\n</html>\n')

# Example usage
csv_file = 'Planets_DATA.csv'  # Path to your CSV file
html_file = 'planetsdata/output.html'  # Path to save the generated HTML file
csv_to_html(csv_file, html_file)

print(f"HTML file '{html_file}' created from '{csv_file}'.")
