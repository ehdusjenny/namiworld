# Perl Basics

While I'm learning Perl for my 2017 Summer research, I'm gonna take few notes here!

```
print "Hello, world\n";
```

```
#This is a single line comment
```

```
=
This is a multi-line comment.
Use as many lines as you'd like until
=cut
```

```
print "White spaces are NOT
             ignored inside quoted strings\n";
```

```
print 'Single quotes are printed literally, i.e. variables and special characters aren't interpolated\n';
```

```
$a = 10;
$var = <<"EOF";
This is a "Here" document and will continue until a EOF. Since "EOF" is in double quotes, everything will be interpolated, like $a.
EOF
print "$var\n";
```
This will print:
This is a "Here" document and will continue until a EOF. Since "EOF" is in double quotes, everything will be interpolated, like 10.

Perl has three datatypes:
1. Scalars are preceded by $. IT is either a number, string, or reference.
	* ``` 	$age = 25; ```
1. Arrays are preceded by @.
	* ```	@ages = (25, 30, 40);
			print "\$ages[0] = $ages[0]\n"; ```
1. Hashes are preceded by %.
	* ```	%data = ('John Paul', 45, 'Lisa', 30);
			print "\$data{'John Paul'} = $data{'John Paul'}\n"; ```
```
$str = "this is " . "concatenated.";
```

## List
```
@array = qw/this is an array delimited by white space/;
```

```
@sequential_abc = (a..z);
```

Push element to the end of the list
```
push(@array, "Hello");
```

Remove and return last element of the list
```
pop(@array);
```

Remove and return first element of the list
```
shift(@array);
```

Push element or list to the front of the list
```
unshift(@array, "Hello");
```

Two ways of slicing an array:
```
@days = qw/Mon Tue Wed Thu Fri Sat Sun/;
@weekend1 = @days[4, 5, 6];
@weekend2 = @days[4..6];
```

There are also `splice`, `split`, `join` and `sort` functions

```
@odd = (1, 3, 5);
@even = (2, 4, 6);
@combined = (@odd, @even);
```

##Hash
```
%data = ('First' => 1, 'Second' => 2, 'Third' => 3);
@array = @data{'First', 'Second'};
```

To get a list of just keys or just values from a hash:
```
@keys_list = keys @data;
@values_list = values @data;
```

To check if key exists:
```
if (exists($data{'Second'}))
```

Adding and removing element:
```
$data{'Fourth'} = 4;
delete $data{'Fourth'};
```

Subroutines are functions:
```
sub subroutine_name {
	$n = scalar(@_); #total number of arguments passed
	foreach $item (@_) {
		if (some boolean) {
			#do stuff
		}
		elsif (other boolean) {
			#do stuff
		}
		else {
			#do stuff
		}
	}
}

subroutine_name(parameter);
```

Perl has `unless` statements but I don't see the need for it when you can just use the equivalent `if (!expression)`.

